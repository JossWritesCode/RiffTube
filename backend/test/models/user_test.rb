require "test_helper"

class UserTest < ActiveSupport::TestCase
  # Uniqueness validations
  test "email must be unique, case insensitive" do
    create(:user, email: "User@Example.com")
    user = build(:user, email: "user@example.com")
    assert_not user.valid?
    assert_includes user.errors[:email], "has already been taken"
  end

  test "username must be unique, case insensitive" do
    create(:user, username: "TakenUsername")
    user = build(:user, username: "takenusername")
    assert_not user.valid?
    assert_includes user.errors[:username], "has already been taken"
  end

  test "uid must be unique if present" do
    create(:user, uid: "OAuthID123")
    user = build(:user, uid: "OAuthID123")
    assert_not user.valid?
    assert_includes user.errors[:uid], "has already been taken"
  end

  # Email validation
  test "invalid email formats are rejected" do
    invalid_emails = ["plainaddress", "missingatsign.com", "user@.com"]
    invalid_emails.each do |email|
      user = build(:user, email: email)
      assert_not user.valid?, "#{email.inspect} should be invalid"
    end
  end

  test "very long emails are invalid" do
    email = "a" * 245 + "@example.com" # 257 chars
    user = build(:user, email: email)
    assert_not user.valid?
  end

  # Password validation
  test "password must be minimum 6 characters" do
    user = build(:user, password: "12345", password_confirmation: "12345")
    assert_not user.valid?
    assert_includes user.errors[:password], "is too short (minimum is 6 characters)"
  end

  test "password and password_confirmation must match" do
    user = build(:user, password: "password1", password_confirmation: "different")
    assert_not user.valid?
  end

  # OAuth behavior
  test "OAuth user requires uid if provider is set" do
    user = build(:user, provider: "google", uid: nil)
    assert_not user.valid?
    assert_includes user.errors[:uid], "can't be blank if provider is set"
  end

  test "switching from OAuth to password requires password" do
    user = create(:user, provider: "google", uid: "123456")
    user.provider = nil
    user.uid = nil
    user.password = "newpassword"
    user.password_confirmation = "newpassword"
  
    assert user.valid?
  end
  
  # Soft delete behavior (if you implement soft delete)
  test "soft-deleted users are not returned by default" do
    user = create(:user)
    user.update(deleted_at: Time.current)
  
    assert_not_includes User.active, user
  end
  
  test "soft-deleted users still retain associations" do
    user = create(:user)
    project = create(:project, owner: user)
    user.update(deleted_at: Time.current)
  
    assert Project.exists?(project.id)
  end
  
  # Cascading deletion for owned content
  test "destroying user deletes owned riffs, comments, media files" do
    user = create(:user)
    riff = create(:riff, creator: user)
    comment = create(:comment, user: user, commentable: riff)
    media_file = create(:media_file, user: user)
  
    assert_difference("Riff.count", -1) do
      assert_difference("Comment.count", -1) do
        assert_difference("MediaFile.count", -1) do
          user.destroy
        end
      end
    end
  end
  
  # Nullify audit logs
  test "destroying user nullifies audit logs" do
    user = create(:user)
    audit_log = create(:audit_log, user: user, entity: create(:riff))
  
    assert_difference -> { AuditLog.where(user_id: nil).count }, +1 do
      user.destroy
    end
  end
end