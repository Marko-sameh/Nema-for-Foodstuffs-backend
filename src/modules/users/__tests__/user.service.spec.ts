import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';

// Mock the UserRepository class
vi.mock('../user.repository');

describe('UserService (Unit Test)', () => {
  let service: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UserService();
  });

  describe('getProfile', () => {
    it('should return user when found', async () => {
      const mockUser = { 
        id: '1', 
        email: 'test@example.com', 
        first_name: 'Test', 
        last_name: 'User',
        role: 'USER'
      };
      
      // Mock the prototype method since the service instantiates it internally
      vi.mocked(UserRepository.prototype.findById).mockResolvedValue(mockUser as any);

      const result = await service.getProfile('1');
      
      expect(result).toEqual(mockUser);
      expect(UserRepository.prototype.findById).toHaveBeenCalledWith('1');
    });

    it('should throw 404 when user not found', async () => {
      vi.mocked(UserRepository.prototype.findById).mockResolvedValue(null);

      // Verify that it throws the correct error object
      await expect(service.getProfile('999')).rejects.toEqual({
        statusCode: 404,
        message: 'User not found',
      });
      expect(UserRepository.prototype.findById).toHaveBeenCalledWith('999');
    });
  });
});
