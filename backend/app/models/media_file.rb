class MediaFile < ApplicationRecord
  ## Associations
  belongs_to :user

  ## Enum  (maps to the Postgres enum `storage_provider_enum`)
  enum provider: {
    gcs: "gcs",
    url: "url"
  }

  ## Validations
  validates :file_type, presence: true

  # Bucket & object_path are required only for GCS‑stored files
  with_options if: :gcs? do
    validates :bucket,      presence: true
    validates :object_path, presence: true
  end

  # public_url is required only for externally‑hosted files
  validates :public_url, presence: true, if: :url?

  validates :size_bytes,
            numericality: { only_integer: true, greater_than: 0 },
            allow_nil: true
end
