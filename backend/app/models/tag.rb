class Tag < ApplicationRecord
    ## Associations
    has_many :project_tags, dependent: :destroy
    has_many :projects, through: :project_tags
  
    ## Validations
    validates :name, presence: true, uniqueness: { case_sensitive: false }
  
    ## Normalize name
    before_validation :normalize_name
  
    private
  
    def normalize_name
      self.name = name.to_s.strip.downcase
    end
  end
  