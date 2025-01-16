import { jest } from '@jest/globals';
import { PartnerInfoRepository } from './partnerInfo.repository.js';

describe('PartnerInfoRepository', () => {
  let mockPrisma;
  let partnerInfoRepository;

  beforeEach(() => {
    mockPrisma = {
      partner: {
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    partnerInfoRepository = new PartnerInfoRepository(mockPrisma);
  });

  test('getPartnerInfo', async () => {
    const mockPartner = {
      id: 1,
      name: 'Test Partner',
      email: 'test@test.com',
      cash: 50000,
      phoneNumber: '010-1234-5678',
    };

    mockPrisma.partner.findUnique.mockResolvedValue(mockPartner);

    const result = await partnerInfoRepository.getPartnerInfo({ id: 1 });

    expect(mockPrisma.partner.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: {
        id: true,
        name: true,
        email: true,
        cash: true,
        phoneNumber: true,
      },
    });
    expect(result).toEqual(mockPartner);
  });

  test('updatePartnerInfo', async () => {
    const mockUpdatedPartner = {
      id: 1,
      name: 'Updated Name',
      email: 'test@test.com',
      cash: 50000,
      phoneNumber: '010-9876-5432',
    };

    mockPrisma.partner.update.mockResolvedValue(mockUpdatedPartner);

    const result = await partnerInfoRepository.updatePartnerInfo(
      { id: 1 },
      'Updated Name',
      '010-9876-5432'
    );

    expect(mockPrisma.partner.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: 'Updated Name',
        phoneNumber: '010-9876-5432',
      },
      select: {
        id: true,
        name: true,
        email: true,
        cash: true,
        phoneNumber: true,
      },
    });
    expect(result).toEqual(mockUpdatedPartner);
  });

  test('deletePartnerInfo', async () => {
    const mockDeletedPartner = {
      id: 1,
      name: 'Test Partner',
    };

    mockPrisma.partner.delete.mockResolvedValue(mockDeletedPartner);

    const result = await partnerInfoRepository.deletePartnerInfo({ id: 1 });

    expect(mockPrisma.partner.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockDeletedPartner);
  });
}); 