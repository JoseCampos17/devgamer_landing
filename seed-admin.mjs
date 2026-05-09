import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL no configurada');
  process.exit(1);
}

const sql = postgres(DATABASE_URL);

async function seedAdmin() {
  try {
    console.log('Insertando admin inicial...');
    const email = 'jgcampo17@gmail.com';
    const password = '6652278Jogf$';
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO "admins" ("email", "passwordHash", "name")
      VALUES (${email}, ${passwordHash}, 'Admin Principal')
      ON CONFLICT ("email") DO UPDATE SET
        "passwordHash" = ${passwordHash},
        "updatedAt" = now()
      RETURNING *;
    `;
    console.log('✓ Admin creado/actualizado:', result[0]);

    await sql.end();
    console.log('✓ Seed completado');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAdmin();
