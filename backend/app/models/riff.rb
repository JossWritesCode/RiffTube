class Riff < ApplicationRecord

  ## Associations

  # Creator
  belongs_to :creator,
             class_name: "User",
             foreign_key: :created_by,
             inverse_of: :created_riffs

  # Latest revision (nullable)
  belongs_to :latest_revision,
             class_name: "RiffVersion",
             optional: true

  # All revisions
  has_many :riff_versions,
           dependent: :destroy

  # Project placement
  has_many :project_riffs,
           dependent: :destroy
  has_many :projects,
           through:   :project_riffs

  # Community
  has_many :comments,
           as: :commentable,
           dependent: :destroy
  has_many :riff_reactions,
           dependent: :destroy

  ## Validations
  validates :created_by, presence: true
end
