require "test_helper"

class ProjectTest < ActiveSupport::TestCase

#     Assert that a Project without a title is invalid.
  test "a Project without a title is invalid" do
    project = build(:project, title: nil)
    assert_not project.valid?
    assert_includes project.errors[:title], "can't be blank"
  end

# cowboy coding... I added it just because it seemed like a good thing to do
  test "a Project title length is max 255" do
    project = build(:project, title: "This title is too long by far!" * 255)
    assert_not project.valid?
    assert_includes project.errors[:title], "is too long (maximum is 255 characters)"
  end

#     Assert that a Project without a video_host is invalid.
  test "a Project without a video_host is invalid" do
    project = build(:project, video_host: nil)
    assert_not project.valid?
    assert_includes project.errors[:video_host], "can't be blank"
  end

#     Assert that visibility must be either "public", "private", or "unlisted".
  test "visibility must be either public, private, or unlisted" do
    valid_vis = %w[public private unlisted]
    valid_vis.each do |vis|
      project = build(:project, visibility: vis)
      assert project.valid?
    end
    project = build(:project, visibility: "SOL")
    assert_not project.valid?
    assert_includes project.errors[:visibility], "is not included in the list"
  end

#     Assert that shareable_link must be unique (but allow nil).
  test "shareable_link must be unique (but allow nil)" do
    create(:project, shareable_link: "foo")
    project = build(:project, shareable_link: "foo")
    assert_not project.valid?
    assert_includes project.errors[:shareable_link], "has already been taken"

    project = build(:project, shareable_link: nil)
    assert project.valid?
  end

#     Assert belongs_to :owner (user must exist).
  test "belongs_to :owner (user must exist)" do
    assoc = Project.reflect_on_association(:owner)
    assert_equal :belongs_to, assoc.macro
    assert_equal "User", assoc.class_name
    assert_equal "owner_id", assoc.foreign_key
  end

#     Assert belongs_to :forked_from_project (can be nil).
  test "belongs_to :forked_from_project (can be nil)" do
    assoc = Project.reflect_on_association(:forked_from_project)
    assert_equal :belongs_to, assoc.macro
    assert_equal "Project", assoc.class_name
    assert_equal "forked_from_project_id", assoc.foreign_key
  end

#     Assert has_many :project_riffs.
  test "has_many :project_riffs" do
    assoc = Project.reflect_on_association(:project_riffs)
    assert_equal :has_many, assoc.macro
    assert_equal "ProjectRiff", assoc.class_name
    assert_equal "project_id", assoc.foreign_key
  end

#     Assert has_many :riffs, through: :project_riffs.
  test "has_many :riffs, through: :project_riffs" do
    assoc = Project.reflect_on_association(:riffs)
    assert_equal :has_many, assoc.macro
    assert_equal "Riff", assoc.class_name
    assert_equal "ProjectRiff", assoc.through_reflection.class_name
    assert_equal "riff_id", assoc.foreign_key
  end

#     Assert has_many :collaborations.
  test "has_many :collaborations" do
    assoc = Project.reflect_on_association(:collaborations)
    assert_equal :has_many, assoc.macro
    assert_equal "Collaboration", assoc.class_name
    assert_equal "project_id", assoc.foreign_key
  end

#     Assert has_many :collaborators, through: :collaborations.
  test "has_many :collaborators, through: :collaborations" do
    assoc = Project.reflect_on_association(:collaborators)
    assert_equal :has_many, assoc.macro
    assert_equal "User", assoc.class_name
    assert_equal "Collaboration", assoc.through_reflection.class_name
    assert_equal "user_id", assoc.foreign_key
  end

#     Assert has_many :project_tags.
  test "has_many :project_tags" do
    assoc = Project.reflect_on_association(:project_tags)
    assert_equal :has_many, assoc.macro
    assert_equal "ProjectTag", assoc.class_name
    assert_equal "project_id", assoc.foreign_key
  end

#     Assert has_many :tags, through: :project_tags.
  test "has_many :tags, through: :project_tags" do
    assoc = Project.reflect_on_association(:tags)
    assert_equal :has_many, assoc.macro
    assert_equal "Tag", assoc.class_name
    assert_equal "ProjectTag", assoc.through_reflection.class_name
    assert_equal "tag_id", assoc.foreign_key
  end

#     Assert has_many :comments (as commentable).
  test "has_many :comments" do
    assoc = Project.reflect_on_association(:comments)
    assert_equal :has_many, assoc.macro
    assert_equal "Comment", assoc.class_name
    assert_equal "commentable_id", assoc.foreign_key
  end

end
