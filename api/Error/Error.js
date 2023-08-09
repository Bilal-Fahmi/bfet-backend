
class InvaildCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

class BlockedUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BlockedUserError';
  }
}

class UserAlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExistError';
  }
}

class HashedPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HashedPasswordError';
  }
}

class UnauthorizedError extends Error {
  constructor(message){
    super(message);
    this.name = 'UnauthorizedError'
  }
}

module.exports={
  InvaildCredentialsError,
  BlockedUserError,
  UserAlreadyExistError,
  HashedPasswordError,
  UnauthorizedError
};
