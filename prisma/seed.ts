import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const email = 'demo@creatorflow.app';
  await db.activityLog.deleteMany();
  await db.contentItem.deleteMany();
  await db.note.deleteMany();
  await db.task.deleteMany();
  await db.project.deleteMany();
  await db.user.deleteMany({ where: { email } });

  const user = await db.user.create({
    data: {
      name: 'Demo Creator',
      email,
      passwordHash: await hash('Demo@1234', 10),
      avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=CreatorFlow'
    }
  });

  const project = await db.project.create({
    data: {
      userId: user.id,
      title: 'Q2 Thought Leadership Campaign',
      description: 'Multi-platform content series for authority growth.',
      status: 'IN_PROGRESS',
      category: 'Marketing',
      progress: 68,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
    }
  });

  await db.task.createMany({
    data: [
      { title: 'Outline newsletter issue #21', priority: 'HIGH', projectId: project.id, assigneeId: user.id },
      { title: 'Record short-form reels batch', priority: 'MEDIUM', projectId: project.id, assigneeId: user.id, completed: true },
      { title: 'Finalize launch assets', priority: 'URGENT', projectId: project.id, assigneeId: user.id }
    ]
  });

  await db.note.createMany({
    data: [
      { userId: user.id, projectId: project.id, title: 'Weekly insights', body: 'Audience resonates most with tactical frameworks + personal story.' },
      { userId: user.id, title: 'Podcast idea', body: 'Episode: the systems behind consistent output.' }
    ]
  });

  await db.contentItem.createMany({
    data: [
      { projectId: project.id, title: 'LinkedIn carousel: creator systems', platform: 'LinkedIn', status: 'SCHEDULED', publishDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) },
      { projectId: project.id, title: 'YouTube breakdown video', platform: 'YouTube', status: 'DRAFT' },
      { projectId: project.id, title: 'X thread: batching workflow', platform: 'X', status: 'PUBLISHED', publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) }
    ]
  });

  await db.activityLog.createMany({
    data: [
      { userId: user.id, message: 'Seeded demo workspace' },
      { userId: user.id, message: 'Updated campaign roadmap' }
    ]
  });

  console.log('Seed complete: demo@creatorflow.app / Demo@1234');
}

main().finally(() => db.$disconnect());
