class User < ApplicationRecord
    has_secure_password

    validates :email, presence: true, uniqueness: true

    has_many :memberships
    has_many :organizations, through: :memberships
end
