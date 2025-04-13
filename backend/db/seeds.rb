
puts "🌱 Starting full RiffTube seeding..."

load Rails.root.join('db/seeds/users.rb')
load Rails.root.join('db/seeds/tags.rb')
load Rails.root.join('db/seeds/projects.rb')
load Rails.root.join('db/seeds/project_tags.rb')
load Rails.root.join('db/seeds/riffs.rb')
load Rails.root.join('db/seeds/comments.rb')
load Rails.root.join('db/seeds/user_relationships.rb')
load Rails.root.join('db/seeds/riff_reactions.rb')
load Rails.root.join('db/seeds/subscriptions.rb')
load Rails.root.join('db/seeds/user_subscriptions.rb')
load Rails.root.join('db/seeds/media_files.rb') 
load Rails.root.join('db/seeds/audit_logs.rb')

puts "✅ Seeding complete!"
