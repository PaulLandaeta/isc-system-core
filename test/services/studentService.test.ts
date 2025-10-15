import * as StudentService from '../../src/services/studentService';

jest.mock('../../src/repositories/userRepository', () => ({
  getStudents: jest.fn(),
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  updateUser: jest.fn(),
}));
jest.mock('../../src/repositories/studentRepository', () => ({
  storeStudent: jest.fn(),
  getStudentById: jest.fn(),
  updateStudent: jest.fn(),
  getStudentByGraduation: jest.fn(),
}));
jest.mock('../../src/repositories/professorRepository', () => ({
  deleteProfessor: jest.fn(),
}));
jest.mock('../../src/repositories/userProfileRepository', () => ({
  getUserById: jest.fn(),
}));
jest.mock('../../src/plugin/logger', () => ({ buildLogger: () => ({ error: jest.fn(), debug: jest.fn() }) }));

const userRepo = require('../../src/repositories/userRepository');
const studentRepo = require('../../src/repositories/studentRepository');
const professorRepo = require('../../src/repositories/professorRepository');
const userProfileRepo = require('../../src/repositories/userProfileRepository');

describe('studentService.getStudents', () => {
  it('returns students', async () => {
    (userRepo.getStudents as jest.Mock).mockResolvedValue(['s']);
    await expect(StudentService.getStudents()).resolves.toEqual(['s']);
  });
});

describe('studentService.createStudent', () => {
  it('stores student', async () => {
    (studentRepo.storeStudent as jest.Mock).mockResolvedValue({ id:1 });
    await expect(StudentService.createStudent({ id:1, is_scholarship:true } as any)).resolves.toEqual({ id:1 });
  });
});

describe('studentService.handleStudentUpdate', () => {
  it('creates or updates student', async () => {
    (professorRepo.deleteProfessor as jest.Mock).mockResolvedValue(undefined);
    (studentRepo.getStudentById as jest.Mock).mockResolvedValue(null);
    (studentRepo.storeStudent as jest.Mock).mockResolvedValue('ok');
    await StudentService.handleStudentUpdate('1',{ is_scholarship:true });
    expect(studentRepo.storeStudent).toHaveBeenCalled();
  });
});
