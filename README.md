##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,add_index: true|
|email|string|null: false,unique: true|
##Association
has_many :groups_users
has_many :groups,through: groups_users
has_many :messages

#groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false,unique: true|
##Association
has_many :groups_users
has_many :user,through: groups_users
has_many :messages

groups_usersテーブル
Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|
##Association
belong_to :group
belong_to: user

##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user-id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|
###Association
belong_to :group
belong_to :user

