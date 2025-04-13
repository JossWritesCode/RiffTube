FactoryBot.define do
    factory :comment do
      association :user
      association :commentable, factory: :riff 
      content { "Test comment content" }   
    end
  end
  