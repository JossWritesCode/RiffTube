class ProjectRiff < ApplicationRecord
  ## Associations
  belongs_to :project
  belongs_to :riff

  ## Validations
  validates :project_id, :riff_id, presence: true
  validates :riff_id,
            uniqueness: { scope: :project_id,
                          message: "already linked to this project" }

  # Optional sanity checks
  validates :start_time, :end_time,
            numericality: { greater_than_or_equal_to: 0 },
            allow_nil: true
end
