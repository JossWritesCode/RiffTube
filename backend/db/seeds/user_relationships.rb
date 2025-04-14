
puts "👥 Seeding user relationships..."

# Fetch users
servo = User.find_by(name: "Tom Servo")
crow = User.find_by(name: "Crow T. Robot")
joel = User.find_by(name: "Joel Robinson")
mike = User.find_by(name: "Mike Nelson")
gypsy = User.find_by(name: "Gypsy")
frank = User.find_by(name: "TV's Frank")
pearl = User.find_by(name: "Pearl Forrester")
brain_guy = User.find_by(name: "Observer (Brain Guy)")
cambot = User.find_by(name: "Cambot")

# Define relationships
relationships = [
  # Following relationships
  { from: servo, to: crow, type: "follow" },
  { from: crow, to: servo, type: "follow" },
  { from: gypsy, to: joel, type: "follow" },
  { from: mike, to: cambot, type: "follow" },
  { from: brain_guy, to: pearl, type: "follow" },
  { from: frank, to: User.where.not(id: frank.id).pluck(:id), type: "follow" }, # Frank follows everyone

  # Blocking relationships
  { from: pearl, to: crow, type: "block" },
  { from: pearl, to: servo, type: "block" },
  { from: pearl, to: mike, type: "block" },
  { from: crow, to: pearl, type: "block" }
]

# Seed relationships
relationships.each do |rel|
  if rel[:to].is_a?(Array)
    # Special case: Frank follows everyone
    rel[:to].each do |user_id|
      UserRelationship.find_or_create_by!(
        from_user_id: rel[:from].id,
        to_user_id: user_id,
        relationship_type: rel[:type]
      )
    end
  else
    UserRelationship.find_or_create_by!(
      from_user_id: rel[:from].id,
      to_user_id: rel[:to].id,
      relationship_type: rel[:type]
    )
  end
end

puts "✅ User relationships seeded."
