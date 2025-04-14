class ProjectTag < ApplicationRecord
    ## Associations
    belongs_to :project
    belongs_to :tag
  
    ## Validations
    validates :project_id, :tag_id, presence: true
    validates :tag_id,
              uniqueness: { scope: :project_id,
                            message: "already added to this project" }
  end
  