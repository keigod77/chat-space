# README

# DB設計

## usersテーブル
| Column | Type | Options |
| ------ | ---- | ------- |
| name | string | null :false |
| email | string | null :false |
| password | string | null :false |
### Assoiation
- has_many :groups, through: :members
- has_many :members
- has_many :messages


## groupsテーブル
| Column | Type | Options |
| ------ | ---- | ------- |
| name | string | null :false |
### Assoiation
- has_many :users, through: :members
- has_many :members
- has_many :messages


## membersテーブル
| Column | Type | Options |
| ------ | ---- | ------- |
| user | references | null: false, foreign_key: true |
| group | references | null: false, foreign_key: true |
### Assoiation
- belongs_to :group
- belongs_to :user

## messagesテーブル
| Column | Type | Options |
| ------ | ---- | ------- |
| body | text | |
| image | string | |
| user | references | null: false, foreign_key: true |
| group | references | null: false, foreign_key: true |
### Assoiation
- belongs_to :user
- belongs_to :group
