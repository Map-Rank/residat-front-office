// eslint-disable-next-line no-unused-vars
class UserModel {
  constructor({ 
      userId, firstName, email, authToken, password, phoneNumber, avatarUrl,
      birthdate, profession, gender, imageFile, lastName, zoneId, sectors, myPosts, myEvents 
  }) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this.phoneNumber = phoneNumber;
      this.birthdate = birthdate;
      this.zoneId = zoneId;
      this.avatarUrl = avatarUrl;
      this.authToken = authToken;
      this.profession = profession;
      this.imageFile = imageFile;
      this.sectors = sectors || [];
      this.myPosts = myPosts || [];
      this.myEvents = myEvents || [];
  }}