class Role < ApplicationRecord
  ## Validations
  validates :name, presence: true, uniqueness: true

  ## Associations
  has_many :collaborations, dependent: :restrict_with_error
  has_many :users,    through: :collaborations
  has_many :projects, through: :collaborations


end