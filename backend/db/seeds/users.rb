
puts "👤 Seeding users..."

users = [
  { name: "Joel Robinson", email: "joel@example.com" },
  { name: "Mike Nelson", email: "mike@example.com" },
  { name: "Tom Servo", email: "servo@example.com" },
  { name: "Crow T. Robot", email: "crow@example.com" },
  { name: "Gypsy", email: "gypsy@example.com" },
  { name: "Cambot", email: "cambot@example.com" },
  { name: "Dr. Clayton Forrester", email: "forrester@example.com" },
  { name: "TV's Frank", email: "frank@example.com" },
  { name: "Magic Voice", email: "magicvoice@example.com" },
  { name: "Pearl Forrester", email: "pearl@example.com" },
  { name: "Professor Bobo", email: "bobo@example.com" },
  { name: "Observer (Brain Guy)", email: "brain_guy@example.com" },
  { name: "TV's Son of TV's Frank", email: "son_of_frank@example.com" }
]

users.each do |user_data|
  User.find_or_create_by!(email: user_data[:email]) do |user|
    user.name = user_data[:name]
    user.password_digest = BCrypt::Password.create('password') # fake password for all
  end
end

puts "✅ Users seeded."
