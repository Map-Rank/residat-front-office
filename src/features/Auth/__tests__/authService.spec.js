import {
    registerUser,
    institutionalRequest,
    loginUser,
    // logOut,
    UpdateUser,
    UpdatePassword,
    ForgotPassword,
    ResetPassword,
  } from '@/features/Auth/services/authService.js';
  import { makeApiPostCall } from '@/api/api';
  import { getFcmToken } from '@/firebaseConfig.js';
  import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
  import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'
  
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
    
      // Correct way to mock localStorage methods
      global.localStorage = {
        setItem: vi.fn(),
        getItem: vi.fn(),
      };
    
      getFcmToken.mockResolvedValue('mock_fcm_token');
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it('should register a user successfully', async () => {
      const mockUserData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890',
        gender: 'male',
        zone: '1',
        lang: 'en'
      };
    
      const mockResponse = {
        data: {
          data: {
            token: 'fake_token',
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            language: 'en'
          },
        },
      };
    
      getFcmToken.mockResolvedValue('mock_fcm_token');
      makeApiPostCall.mockResolvedValue(mockResponse);
      const onSuccess = vi.fn();
      const onError = vi.fn();
    
      await registerUser(mockUserData, authStore, onSuccess, onError);
    
      expect(makeApiPostCall).toHaveBeenCalledWith(
        API_ENDPOINTS.register,
        expect.any(FormData),
        null,
        true
      );
    
      // Vérifier le contenu du FormData
      const formData = makeApiPostCall.mock.calls[0][1];
      expect(formData.get('first_name')).toBe('John');
      expect(formData.get('last_name')).toBe('Doe');
      expect(formData.get('email')).toBe('john.doe@example.com');
      expect(formData.get('phone')).toBe('1234567890');
      expect(formData.get('gender')).toBe('male');
      expect(formData.get('zone_id')).toBe('1');
      expect(formData.get('language')).toBe('en');
      expect(formData.get('fcm_token')).toBe('mock_fcm_token');
    
      expect(authStore.setUser).toHaveBeenCalledWith(mockResponse.data.data);
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.userInfo, JSON.stringify(mockResponse.data.data));
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.authToken, 'fake_token');
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.isloggedIn, true);
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.appLanguage, 'en');
      
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
  
    it('should handle errors during registration', async () => {
      const mockUserData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890',
        gender: 'male',
        zone: '1',
        lang: 'en'
      };
    
      const mockErrorResponse = {
        response: {
          data: {
            errors: {
              email: ['Email already exists']
            }
          }
        }
      };
    
      getFcmToken.mockResolvedValue('mock_fcm_token');
      makeApiPostCall.mockRejectedValue(mockErrorResponse);
      const onSuccess = vi.fn();
      const onError = vi.fn();
    
      await expect(registerUser(mockUserData, authStore, onSuccess, onError)).rejects.toThrow();
    
      expect(makeApiPostCall).toHaveBeenCalledWith(
        API_ENDPOINTS.register,
        expect.any(FormData),
        null,
        true
      );
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(mockErrorResponse.response.data.errors);
    });
  
    it('should send an institutional request successfully', async () => {
      const mockInstitutionData = {
        company_name: 'TechCorp',
        description: 'A leading tech company',
        email: 'info@techcorp.com',
        phone: '1234567890',
        password: 'securepassword',
        zone: '2',
        profile_picture: new File(['dummy content'], 'profile.png', { type: 'image/png' }),
        lang: 'en',
      };
    
      const mockResponse = {
        data: {
          data: {
            verified: true,
            user: {
              id: 1,
              company_name: 'TechCorp',
              email: 'info@techcorp.com',
              language: 'en',
              token: 'fake_token',
            },
          },
        },
      };
    
      getFcmToken.mockResolvedValue('mock_fcm_token');
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      const onSuccess = vi.fn();
      const onError = vi.fn();
      const handleEmailNotVerified = vi.fn();
    
      const authStore = {
        setUser: vi.fn(),
      };
    
      await institutionalRequest(mockInstitutionData, authStore, onSuccess, onError, handleEmailNotVerified);
    
      // Vérifier que `makeApiPostCall` a été appelé avec les bons arguments
      expect(makeApiPostCall).toHaveBeenCalledWith(
        '/create/request',
        expect.any(FormData),
        null,
        true
      );
    
      // Vérifier le contenu du FormData
      const formData = makeApiPostCall.mock.calls[0][1];
      expect(formData.get('company_name')).toBe('TechCorp');
      expect(formData.get('description')).toBe('A leading tech company');
      expect(formData.get('email')).toBe('info@techcorp.com');
      expect(formData.get('phone')).toBe('1234567890');
      expect(formData.get('password')).toBe('securepassword');
      expect(formData.get('zone_id')).toBe('2');
      expect(formData.get('profile_picture')).toBe(mockInstitutionData.profile_picture);
      expect(formData.get('language')).toBe('en');
      expect(formData.get('fcm_token')).toBe('mock_fcm_token');
    
      // Vérifier que les appels aux fonctions de gestion des données utilisateur et du succès ont été effectués
      expect(authStore.setUser).toHaveBeenCalledWith(mockResponse.data.data.user);
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.userInfo, JSON.stringify(mockResponse.data.data.user));
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.authToken, 'fake_token');
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.isloggedIn, true);
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.appLanguage, 'en');
    
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(handleEmailNotVerified).not.toHaveBeenCalled();
    });
  
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
        '/profile/update/1',
        expect.any(FormData),
        'fake_token', // Token est maintenant passé correctement
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

    it('should register an institution successfully', async () => {
      const mockInstitutionData = {
        company_name: 'Test Company',
        description: 'Description of the company',
        email: 'company@example.com',
        phone: '1234567890',
        password: 'password123',
        zone: '2',
        lang: 'en',
        profile_picture: new Blob(['profile_picture'], { type: 'image/png' })
      };
    
      const mockResponse = {
        data: {
          data: {
            verified: true,
            user: {
              token: 'fake_token',
              id: 2,
              email: 'company@example.com',
              language: 'en'
            }
          }
        }
      };
    
      getFcmToken.mockResolvedValue('mock_fcm_token');
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      const onSuccess = vi.fn();
      const onError = vi.fn();
      const handleEmailNotVerified = vi.fn();
    
      await institutionalRequest(mockInstitutionData, authStore, onSuccess, onError, handleEmailNotVerified);
    
      expect(makeApiPostCall).toHaveBeenCalledWith('/create/request', expect.any(FormData), null, true);
    
      const formData = makeApiPostCall.mock.calls[0][1];
      expect(formData.get('company_name')).toBe('Test Company');
      expect(formData.get('description')).toBe('Description of the company');
      expect(formData.get('email')).toBe('company@example.com');
      expect(formData.get('phone')).toBe('1234567890');
      expect(formData.get('zone_id')).toBe('2');
      expect(formData.get('language')).toBe('en');
      expect(formData.get('fcm_token')).toBe('mock_fcm_token');
    
      expect(authStore.setUser).toHaveBeenCalledWith(mockResponse.data.data.user);
      expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.authToken,'fake_token');
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(handleEmailNotVerified).not.toHaveBeenCalled();
    });
    
    it('should handle unverified institution email', async () => {
      const mockResponse = {
        data: { data: { verified: false } }
      };
    
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      const onSuccess = vi.fn();
      const onError = vi.fn();
      const handleEmailNotVerified = vi.fn();
    
      await institutionalRequest({}, authStore, onSuccess, onError, handleEmailNotVerified);
    
      expect(handleEmailNotVerified).toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();
    });


    it('should log in a user successfully', async () => {
      // Données fictives de l'utilisateur
      const mockCredentials = {
        email: 'john.doe@example.com',
        password: 'password123'
      };
    
      // Structure de la réponse attendue de l'API
      const mockResponse = {
        data: {
          data: {
            token: 'fake_token',
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            language: 'en'
          }
        }
      };
    
      // Mock des appels aux fonctions
      getFcmToken.mockResolvedValue('mock_fcm_token');
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      // Création des mocks pour les callbacks
      const onSuccess = vi.fn();
      const onError = vi.fn();
      const handleEmailNotVerified = vi.fn();
    
      // Appel de la fonction loginUser avec les données de test
      await loginUser(mockCredentials, authStore, onSuccess, onError, handleEmailNotVerified);
    
      // Vérification des appels API avec les bonnes données
      expect(makeApiPostCall).toHaveBeenCalledWith(API_ENDPOINTS.login, expect.any(FormData), null, true);
    
      // Vérification de l'enregistrement du token dans le localStorage
      expect(authStore.setUser).toHaveBeenCalledWith(mockResponse.data.data);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEYS.authToken,
        'fake_token'
      );
    
      // Vérification de l'appel de onSuccess et non de onError
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it('should update the user password successfully', async () => {
      const mockUserData = {
        old_password: 'oldPass123',
        password: 'newPass123',
        password_confirmation: 'newPass123'
      };
    
      const mockResponse = { status: 200 };
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      const onSuccess = vi.fn();
      const onError = vi.fn();
    
      await UpdatePassword(mockUserData, onSuccess, onError);
    
      expect(makeApiPostCall).toHaveBeenCalledWith(
        `${API_ENDPOINTS.UpdatePassword}`,
        expect.any(Object),
        'fake_token',
        true
      );
    
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it('should handle forgot password successfully', async () => {
      const mockUserData = { email: 'john.doe@example.com' };
    
      const mockResponse = { status: 200 };
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      const onSuccess = vi.fn();
      const onError = vi.fn();
    
      await ForgotPassword(mockUserData, onSuccess, onError);
    
      expect(makeApiPostCall).toHaveBeenCalledWith(
        '/forgot-password',
        expect.any(FormData),
        true
      );
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it('should reset the user password successfully', async () => {
      const mockUserData = {
        password: 'newPass123',
        password_confirmation: 'newPass123'
      };
      const emailFromUrl = 'john.doe@example.com';
      const token = 'resetToken123';
    
      const mockResponse = { status: 200 };
      makeApiPostCall.mockResolvedValue(mockResponse);
    
      const onSuccess = vi.fn();
      const onError = vi.fn();
    
      await ResetPassword(emailFromUrl, mockUserData, token, onSuccess, onError);
    
      expect(makeApiPostCall).toHaveBeenCalledWith(
        '/reset-password',
        expect.any(FormData),
        true
      );
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
  });
  