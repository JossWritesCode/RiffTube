class Project < ApplicationRecord

  ## Associations

  # Owner
  belongs_to :owner, class_name: "User"

  # Fork relationship (optional)
  belongs_to :forked_from_project,
             class_name: "Project",
             optional: true

  # Riffs
  has_many :project_riffs,
           dependent: :destroy
  has_many :riffs,
           through:   :project_riffs

  # Collaborations
  has_many :collaborations,
           dependent: :destroy
  has_many :collaborators,
           through: :collaborations,
           source:  :user

  # Tags
  has_many :project_tags,
           dependent: :destroy
  has_many :tags,
           through:   :project_tags

  # Comments (polymorphic)
  has_many :comments,
           as: :commentable,
           dependent: :destroy

  ## Validations
  validates :title,       presence: true
  validates :video_host,  presence: true
  validates :visibility,  inclusion: { in: %w[public private unlisted] }
  validates :shareable_link, uniqueness: true, allow_nil: true
end
