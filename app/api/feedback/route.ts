import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FEEDBACK_FILE = path.join(process.cwd(), 'feedback.json');

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }
    let feedbacks = [];
    try {
      const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
      feedbacks = JSON.parse(data);
    } catch (e) {
      feedbacks = [];
    }
    const newFeedback = {
      name,
      message,
      date: new Date().toISOString(),
    };
    feedbacks.push(newFeedback);
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save feedback.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
    const feedbacks = JSON.parse(data);
    return NextResponse.json({ feedbacks });
  } catch (e) {
    return NextResponse.json({ feedbacks: [] });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { index } = await req.json();
    if (typeof index !== 'number') {
      return NextResponse.json({ error: 'Index is required.' }, { status: 400 });
    }
    const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
    const feedbacks = JSON.parse(data);
    if (index < 0 || index >= feedbacks.length) {
      return NextResponse.json({ error: 'Invalid index.' }, { status: 400 });
    }
    feedbacks.splice(index, 1);
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete feedback.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { index, name, message } = await req.json();
    if (typeof index !== 'number' || !name || !message) {
      return NextResponse.json({ error: 'Index, name, and message are required.' }, { status: 400 });
    }
    const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
    const feedbacks = JSON.parse(data);
    if (index < 0 || index >= feedbacks.length) {
      return NextResponse.json({ error: 'Invalid index.' }, { status: 400 });
    }
    feedbacks[index].name = name;
    feedbacks[index].message = message;
    feedbacks[index].date = new Date().toISOString();
    await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update feedback.' }, { status: 500 });
  }
} 