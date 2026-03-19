import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'REVIEW', 'DONE']),
  category: z.string().optional(),
  deadline: z.string().optional()
});

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  dueDate: z.string().optional(),
  projectId: z.string()
});

export const noteSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(3),
  projectId: z.string().optional()
});

export const contentItemSchema = z.object({
  title: z.string().min(2),
  platform: z.string().min(2),
  publishDate: z.string().optional(),
  status: z.enum(['IDEA', 'DRAFT', 'SCHEDULED', 'PUBLISHED']),
  projectId: z.string()
});
