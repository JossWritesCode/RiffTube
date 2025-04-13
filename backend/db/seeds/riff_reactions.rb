puts "👍👎 Seeding riff reactions..."

# Fetch users
servo = User.find_by(name: "Tom Servo")
crow = User.find_by(name: "Crow T. Robot")
joel = User.find_by(name: "Joel Robinson")
mike = User.find_by(name: "Mike Nelson")
gypsy = User.find_by(name: "Gypsy")
frank = User.find_by(name: "TV's Frank")
pearl = User.find_by(name: "Pearl Forrester")

# Fetch riffs
riffs = Riff.all.to_a

# Define some reactions
reactions_data = [
  { user: crow, riff: riffs[0], type: "like" },
  { user: servo, riff: riffs[1], type: "like" },
  { user: mike, riff: riffs[2], type: "dislike" },
  { user: gypsy, riff: riffs[3], type: "like" },
  { user: joel, riff: riffs[4], type: "like" },
  { user: frank, riff: riffs[5], type: "like" },
  { user: pearl, riff: riffs[6], type: "dislike" },
  { user: servo, riff: riffs[7], type: "like" },
  { user: crow, riff: riffs[8], type: "dislike" },
  { user: mike, riff: riffs[9], type: "dislike" }
]

# Seed reactions
reactions_data.each do |reaction|
  next unless reaction[:riff]

  RiffReaction.find_or_create_by!(
    user_id: reaction[:user].id,
    riff_id: reaction[:riff].id,
    reaction_type: reaction[:type]
  )
end

puts "✅ Riff reactions seeded."
