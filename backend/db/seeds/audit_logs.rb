# frozen_string_literal: true

Rails.logger.info '📜 Seeding audit logs...'

# Fetch users
servo = fetch_user!('Tom Servo')
crow = fetch_user!('Crow T. Robot')
joel = fetch_user!('Joel Robinson')
mike = fetch_user!('Mike Nelson')
gypsy = fetch_user!('Gypsy')

# Fetch riffs, comments, and projects
some_riff = Riff.first
another_riff = Riff.second
some_project = Project.first
another_project = Project.second
some_comment = Comment.first

# Seed audit logs
audit_logs = [
  {
    user: servo,
    action: 'created_riff',
    entity_type: 'Riff',
    entity_id: some_riff.id,
    details: { note: 'First hilarious riff by Servo' }
  },
  {
    user: crow,
    action: 'created_comment',
    entity_type: 'Comment',
    entity_id: some_comment.id,
    details: { content_preview: some_comment.content.truncate(30) }
  },
  {
    user: mike,
    action: 'liked_riff',
    entity_type: 'Riff',
    entity_id: another_riff.id,
    details: { reaction: 'like' }
  },
  {
    user: gypsy,
    action: 'created_project',
    entity_type: 'Project',
    entity_id: another_project.id,
    details: { title: another_project.title }
  },
  {
    user: joel,
    action: 'forked_project',
    entity_type: 'Project',
    entity_id: some_project.id,
    details: { fork_reason: 'Wanted to riff differently' }
  }
]

audit_logs.each do |log|
  AuditLog.create!(
    user_id: log[:user].id,
    action: log[:action],
    entity_type: log[:entity_type],
    entity_id: log[:entity_id],
    details: log[:details],
    created_at: Time.current,
    updated_at: Time.current
  )
end

Rails.logger.info '✅ Audit logs seeded.'
