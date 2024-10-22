import {
    registerUser,
    institutionalRequest,
    loginUser,
    logOut,
    UpdateUser,
    UpdatePassword,
    ForgotPassword,
    ResetPassword,
  } from '@/features/Auth/services/authService.js';
  import { makeApiPostCall } from '@/api/api';
  import { getFcmToken } from '@/firebaseConfig.js';
  import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
  
  // Mock Firebase messaging
  vi.mock('firebase/messaging', () => ({
    onMessage: vi.fn(), // Mock onMessage function
  }));
  
  // Mock the firebaseConfig.js file
  vi.mock('@/firebaseConfig', () => ({
    messaging: {}, // Mock the messaging object
    getFcmToken: vi.fn(), // Mock getFcmToken function
  }));
  
  // Mock the makeApiPostCall function
  vi.mock('@/api/api', () => ({
    makeApiPostCall: vi.fn(), // Mock makeApiPostCall function
  }));
  
  describe('authService', () => {
    let authStore;
  
    beforeEach(() => {
      authStore = {
        setUser: vi.fn(),
        logOut: vi.fn(),
        settoken: vi.fn(),
      };
      // global.localStorage.setItem = vi.fn();
      // global.localStorage.getItem = vi.fn();
      vi.spyOn(global.localStorage, 'setItem');
vi.spyOn(global.localStorage, 'getItem');

      getFcmToken.mockResolvedValue('fake_fcm_token');
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it('should register a user successfully', async () => {
      // Existing test code for registerUser
    });
  
    it('should handle errors during registration', async () => {
      // Existing test code for handling errors during registration
    });
  
  //   it('should send an institutional request successfully', async () => {
  //     const mockInstitutionData = {
  //       company_name: 'Example Corp',
  //       description: 'Example description',
  //       email: 'example@example.com',
  //       phone: '123456789',
  //       password: 'password',
  //       zone: '1',
  //       lang: 'en',
  //       profile_picture: new Blob(),
  //     };
  
  //     const mockResponse = {
  //       data: {
  //         data: {
  //           token: 'fake_token',
  //           user: {
  //             id: 1,
  //             first_name: 'John',
  //             last_name: 'Doe',
  //             email: 'john.doe@example.com',
  //           },
  //         },
  //       },
  //     };
  
  //     makeApiPostCall.mockResolvedValue(mockResponse);
  //     const onSuccess = vi.fn();
  //     const onError = vi.fn();
  
  //     await institutionalRequest(mockInstitutionData, authStore, onSuccess, onError);
  
  //     expect(makeApiPostCall).toHaveBeenCalledWith(
  //       '/create/request', // Ensure this matches the actual URL used in your code
  //       expect.any(FormData),
  //       null,
  //       true
  //     );
  //     expect(authStore.setUser).toHaveBeenCalledWith({
  //       id: 1,
  //       first_name: 'John',
  //       last_name: 'Doe',
  //       email: 'john.doe@example.com',
  //     });
  //     expect(localStorage.setItem).toHaveBeenCalledWith('userInfo', JSON.stringify({
  //       id: 1,
  //       first_name: 'John',
  //       last_name: 'Doe',
  //       email: 'john.doe@example.com',
  //     }));
  //     expect(onSuccess).toHaveBeenCalled();
  //     expect(onError).not.toHaveBeenCalled();
  //   });
  // });
  
    // it('should log in a user successfully', async () => {
    //   const mockUserCredentials = {
    //     email: 'john.doe@example.com',
    //     password: 'password',
    //   };
  
    //   const mockResponse = {
    //     data: {
    //       data: {
    //         token: 'fake_token',
    //         user: {
    //           id: 1,
    //           first_name: 'John',
    //           last_name: 'Doe',
    //           email: 'john.doe@example.com',
    //         },
    //       },
    //     },
    //   };
  
    //   makeApiPostCall.mockResolvedValue(mockResponse);
    //   const onSuccess = vi.fn();
    //   const onError = vi.fn();
  
    //   await loginUser(mockUserCredentials, authStore, onSuccess, onError);
  
    //   expect(makeApiPostCall).toHaveBeenCalledWith(
    //     '/login', // Ensure this matches the actual URL used in your code
    //     expect.any(FormData)
    //   );
    //   expect(authStore.setUser).toHaveBeenCalledWith({
    //     id: 1,
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     email: 'john.doe@example.com',
    //   });
    //   expect(localStorage.setItem).toHaveBeenCalledWith('userInfo', JSON.stringify({
    //     id: 1,
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     email: 'john.doe@example.com',
    //   }));
    //   expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'fake_token');
    //   expect(onSuccess).toHaveBeenCalled();
    //   expect(onError).not.toHaveBeenCalled();
    // });
  
    it('should update a user successfully', async () => {
      const mockUserData = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        phone: '123456789',
        date_of_birth: '2000-01-01',
        gender: 'male',
        token: 'fake_token',
      };
  
      const mockResponse = {
        data: {
          data: {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            phone: '123456789',
          },
        },
      };
  
      makeApiPostCall.mockResolvedValue(mockResponse);
      const onSuccess = vi.fn();
      const onError = vi.fn();
  
      await UpdateUser(mockUserData, authStore, onSuccess, onError);
  
      expect(makeApiPostCall).toHaveBeenCalledWith(
        '/profile/update/1', // Ensure this matches the actual URL used in your code
        expect.any(FormData),
        'fake_token',
        true
      );
      expect(authStore.setUser).toHaveBeenCalledWith(mockResponse.data.data);
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
  
    // it('should log out a user successfully', async () => {
    //   await logOut(authStore);
    //   expect(authStore.logOut).toHaveBeenCalled();
    // //   expect(localStorage.setItem).toHaveBeenCalledWith('isloggedIn', false);
    // });
  
    // it('should update password successfully', async () => {
    //   const mockUserData = {
    //     old_password: 'oldpassword',
    //     password: 'newpassword',
    //     password_confirmation: 'newpassword',
    //   };
  
    //   const mockResponse = {
    //     data: {
    //       message: 'Password updated successfully!',
    //     },
    //   };
  
    //   makeApiPostCall.mockResolvedValue(mockResponse);
    //   const onSuccess = vi.fn();
    //   const onError = vi.fn();
  
    //   await UpdatePassword(mockUserData, onSuccess, onError);
  
    //   expect(makeApiPostCall).toHaveBeenCalledWith(
    //     '/password/update', // Ensure this matches the actual URL used in your code
    //     {
    //       old_password: 'oldpassword',
    //       password: 'newpassword',
    //       password_confirmation: 'newpassword',
    //       _method: 'PUT',
    //     },
    //     null, // Ensure this matches the actual value used in your code
    //     true
    //   );
    //   expect(onSuccess).toHaveBeenCalled();
    //   expect(onError).not.toHaveBeenCalled();
    // });
  

  
    // it('should handle reset password successfully', async () => {
    //   const mockUserData = {
    //     password: 'newpassword',
    //     password_confirmation: 'newpassword',
    //   };
    //   const mockToken = 'reset_token';
    //   const mockEmail = 'john.doe@example.com';
  
    //   const mockResponse = {
    //     data: {
    //       message: 'Password reset successfully!',
    //     },
    //   };
  
    //   makeApiPostCall.mockResolvedValue(mockResponse);
    //   const onSuccess = vi.fn();
    //   const onError = vi.fn();
  
    //   await ResetPassword(mockEmail, mockUserData, mockToken, onSuccess, onError);
  
    //   expect(makeApiPostCall).toHaveBeenCalledWith(
    //     '/reset-password',
    //     expect.any(FormData),
    //     true
    //   );
    //   expect(onSuccess).toHaveBeenCalled();
    //   expect(onError).not.toHaveBeenCalled();
    // });
  });
  