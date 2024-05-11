class Organization < ApplicationRecord
    has_many :memberships
    has_many :users, through: :memberships

    has_many :medical_records

    has_many :invitations
end
