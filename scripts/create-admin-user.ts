import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createAdminUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  if (!email || !password) {
    throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables');
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (existingUser) {
    // Update existing user's password
    const { error } = await supabase
      .from('admin_users')
      .update({ 
        password_hash: passwordHash,
        updated_at: new Date().toISOString()
      })
      .eq('email', email);
    
    if (error) {
      console.error('Error updating admin user:', error);
      process.exit(1);
    }
    
    console.log('✅ Admin user password updated successfully');
  } else {
    // Create new user
    const { error } = await supabase
      .from('admin_users')
      .insert({
        email,
        password_hash: passwordHash,
        is_active: true
      });
    
    if (error) {
      console.error('Error creating admin user:', error);
      process.exit(1);
    }
    
    console.log('✅ Admin user created successfully');
  }
  
  console.log('Email:', email);
  console.log('Password:', password);
}

createAdminUser().catch(console.error);