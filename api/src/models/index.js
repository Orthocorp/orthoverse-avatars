// This file is autogenerated by Redwood and will be overwitten periodically

import { RedwoodRecord } from '@redwoodjs/record'

import { db } from 'src/lib/db'
import datamodel from 'src/models/datamodel'

RedwoodRecord.db = db
RedwoodRecord.schema = datamodel

import AuthDetail from 'src/models/AuthDetail'
import User from 'src/models/User'

AuthDetail.requiredModels = [User]
User.requiredModels = [AuthDetail]

export { AuthDetail, User }
