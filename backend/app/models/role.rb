# frozen_string_literal: true

# The Role class represents a role in the system, which is associated with users and projects
# through collaborations. It includes validations for the presence and uniqueness of the name.
class Role < ApplicationRecord
  ## Validations
  validates :name, presence: true, uniqueness: true

  ## Associations
  has_many :collaborations, dependent: :restrict_with_error
  has_many :users,    through: :collaborations
  has_many :projects, through: :collaborations
end
