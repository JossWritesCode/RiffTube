puts "🏷️ Seeding tags..."

tags = [
  "badmovies",
  "classics",
  "sci-fi",
  "space",
  "horror",
  "cheese",
  "martial-arts",
  "robots",
  "santa",
  "musicals",
  "action",
  "documentary",
  "mind-control",
  "monsters",
  "cold-war",
  "singing",
  "creatures",
  "psychic-powers",
  "mystery",
  "1950s",
  "alien-invasion",
  "future-shock"
]

tags.each do |tag_name|
  Tag.find_or_create_by!(name: tag_name)
end

puts "✅ Tags seeded."
