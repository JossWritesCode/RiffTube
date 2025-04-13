# db/seeds/user_subscriptions.rb

puts "🙋‍♂️ Seeding user subscriptions..."

# Fetch subscriptions
riffer = Subscription.find_by(name: "Riffer")
super_riffer = Subscription.find_by(name: "Super Riffer")

# Fetch users
joel = User.find_by(name: "Joel Robinson")
mike = User.find_by(name: "Mike Nelson")
crow = User.find_by(name: "Crow T. Robot")
servo = User.find_by(name: "Tom Servo")
gypsy = User.find_by(name: "Gypsy")

# Assign plans
user_subscriptions = [
  { user: joel, plan: riffer },
  { user: mike, plan: riffer },
  { user: crow, plan: super_riffer },
  { user: servo, plan: super_riffer },
  { user: gypsy, plan: riffer }
]

user_subscriptions.each do |sub|
  UserSubscription.find_or_create_by!(
    user_id: sub[:user].id,
    subscription_id: sub[:plan].id,
    started_at: Time.now
  )
end

puts "✅ User subscriptions seeded."
