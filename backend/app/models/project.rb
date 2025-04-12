class Project < ApplicationRecord
    belongs_to :owner, class_name: "User"
  
    has_many :project_riffs
    has_many :riffs, through: :project_riffs
  
    has_many :collaborations
    has_many :collaborators, through: :collaborations, source: :user
  
    has_many :project_tags
    has_many :tags, through: :project_tags
  
    belongs_to :forked_from_project, class_name: "Project", optional: true
  end
  