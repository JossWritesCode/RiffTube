class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :uid, uniqueness: true, allow_nil: true

    has_secure_password validations: false
end
