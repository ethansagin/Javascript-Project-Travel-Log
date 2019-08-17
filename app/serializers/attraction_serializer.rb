class AttractionSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :kind_of_attraction, :recommend, :comments
  belongs_to :destination
end
