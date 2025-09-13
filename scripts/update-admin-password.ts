import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function updateAdminPassword() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Generate a secure random password
  const generateSecurePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
  
  const email = 'n.sawada@non-turn.com';
  const newPassword = generateSecurePassword();
  
  // Hash the new password
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  // Update the admin user's password
  const { error } = await supabase
    .from('admin_users')
    .update({ 
      password_hash: passwordHash,
      updated_at: new Date().toISOString()
    })
    .eq('email', email);
  
  if (error) {
    console.error('Error updating admin password:', error);
    process.exit(1);
  }
  
  // Invalidate all existing sessions for this user
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();
  
  if (adminUser) {
    await supabase
      .from('admin_sessions')
      .delete()
      .eq('admin_user_id', adminUser.id);
  }
  
  console.log('✅ Admin password updated successfully');
  console.log('=====================================');
  console.log('New credentials (SAVE THESE SECURELY):');
  console.log('Email:', email);
  console.log('Password:', newPassword);
  console.log('=====================================');
  console.log('⚠️  Please save these credentials in a secure password manager');
  console.log('⚠️  All existing sessions have been invalidated');
}

updateAdminPassword().catch(console.error);