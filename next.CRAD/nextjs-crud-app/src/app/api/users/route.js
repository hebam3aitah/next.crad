// app/api/users/route.js
const { db } = require('../../lib/db');
const { NextResponse } = require('next/server');

// استرجاع جميع المستخدمين
export async function GET() {
  try {
    const result = await db.query('SELECT * FROM users WHERE deleted = false');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// إضافة مستخدم جديد
export async function POST(req) {
  const { name, email } = await req.json();
  try {
    const result = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

// تعديل مستخدم
export async function PUT(req) {
  const { id, name, email } = await req.json();
  try {
    const result = await db.query('UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *', [name, email, id]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// حذف (حذف منطقي) مستخدم
export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await db.query('UPDATE users SET deleted=true WHERE id=$1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
