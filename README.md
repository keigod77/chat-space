# README

#DB設計

##usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null :false|
|email|string|null :false|
|password|string|null :false|


###Assoiation
- has_many :groups, through: :members
- has_many :members
- has_many :messages


##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null :false|
|user_id|integer|null :false, foreign_key: true|

###Assoiation
- has_many :users, through: :members
- has_many :members
- has_many :messages


##membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Assoiation
- belongs_to :group
- belongs_to :user

##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Assoiation
- belongs_to :user
- belongs_to :group
