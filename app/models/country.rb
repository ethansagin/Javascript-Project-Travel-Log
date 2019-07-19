class Country < ApplicationRecord
    has_many :destinations
    has_many :users, through: :destinations
end
