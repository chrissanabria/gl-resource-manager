import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { getToken } from './auth.js';

const prisma = new PrismaClient();

const gqltypeDefs = `#graphql
	type Role {
		id: ID
		name: String!
	}

    type User {
        id: ID!
        email: String!
        name: String!
        lastname: String!
        phone: String!
        company: String!
    }

    type AuthToken {
        token: String!
        user: User!
    }

    input CreateUser {
        email: String!
        password: String!
        name: String!
        lastname: String!
        phone: String!
        company: String!
    }

    type Resource {
        id: ID!
        name: String!
        lastname: String!
        birthdate: DateTime!
        hiredate: DateTime!
        is_available: Boolean!
        practice: Practice!
        seniority: Seniority!
    }

    type Practice {
        id: ID!
        name: String!
        description: String!
    }

    type Seniority {
        id: ID!
        name: String!
        description: String!
    }

    type Query {
        roles: [Role]
        users: [User]
        user(id: ID!): User
        resources: [Resource]
        practices: [Practice]
        seniorities: [Seniority]
    }

    type Mutation {
        addRole(name: String!): Role
        addUser(user: CreateUser!): User
        login(email: String!, password: String!): AuthToken
        assignUserRole(userId: ID!, roleId: ID!): ID
    }
`

const gqlresolvers = {
	Query: {
        roles: () => {
            return prisma.role.findMany();
        },
        users: () => {
            return prisma.user.findMany();
        },
        user: (_, args) => {
            return prisma.user.findUnique({
                where: {
                    id: Number(args.id)
                }
            });
        },
        resources: (_, args, context) => {
            if (!context.authData.userId) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                      code: 'UNAUTHENTICATED',
                      http: { status: 401 },
                    },
                  });
            }
            return prisma.resource.findMany();
        },
        practices: () => {
            return prisma.practice.findMany();
        },
        seniorities: () => {
            return prisma.seniority.findMany();
        }
	},
    Mutation : {
        async addRole(_, args) {
            let role = {
                name: args.name
            }
            return await prisma.role.create({data: role});
        },
        async addUser(_, args) {
            let user = args.user;
            user.password = await hash(user.password, 12);
            let createdUser = await prisma.user.create({data: user});
            let userRole = {
                user_id: createdUser.id,
                role_id: 2
            }
            await prisma.user_role.create({data: userRole});
            return createdUser;
        },
        async login(_, args) {
            const user = await prisma.user.findUnique({ 
                where: { 
                    email: args.email
                }
            });
            if (!user) {
                throw new Error('User not found.')
            }

            const valid = await compare(args.password, user.password)
            if (!valid) {
                throw new Error('Invalid credentials.')
            }

            const ur = await prisma.user_role.findFirst({
                where: {
                    user_id: user.id
                }
            });
            if (!ur){
                return new Error('Invalid role.');
            }

            const token = getToken(user.id, ur.role_id);
            return {
                token: token,
                user: user
            }
        },
        async assignUserRole(_, args, context) {
            if (!context.authData.userId) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                      code: 'UNAUTHENTICATED',
                      http: { status: 401 },
                    },
                  });
            }

            const userId = Number(args.userId);
            const roleId = Number(args.roleId);
            const ur = await prisma.user_role.findFirst({
                where: {
                    user_id: userId, 
                    role_id: roleId
                }
            });
            if (ur){
                return ur.id;
            }

            let userRole = {
                user_id: userId,
                role_id: roleId
            }
            return (await prisma.user_role.create({data: userRole})).id;
        }
    }
}

export const typeDefs = gqltypeDefs;
export const resolvers = gqlresolvers;