class Collaboration < ApplicationRecord
  ## Associations
  belongs_to :user
  belongs_to :project
  belongs_to :role

  ## Validations
  validates :user_id, :project_id, :role_id, presence: true
  validates :user_id,
            uniqueness: { scope: :project_id,
                          message: "already collaborates on this project" }
end
