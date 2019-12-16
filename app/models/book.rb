class Book < ApplicationRecord
  validates :isbn, uniqueness: true, length: { is: 13 }

  def self.csv_attributes
    ["title", "isbn", "created_at", "updated_at"]
  end

  def self.generate_csv
    CSV.generate(headers: true) do |csv|
      csv << csv_attributes
      all.each do |book|
        csv << csv_attributes.map { |attr| book.send(attr) }
      end
    end
  end
end
