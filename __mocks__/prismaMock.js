import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';

export const prismaMock = mockDeep();

beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock; 