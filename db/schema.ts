import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    boolean,
    pgEnum,
    foreignKey
} from 'drizzle-orm/pg-core';
import type {AdapterAccount} from "@auth/core/adapters";
import {relations} from 'drizzle-orm';

export const users = pgTable("user", {
  id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"), 
    role: text("role")

})

export const roles = pgTable("roles",{
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // 
  description: text("description").notNull(),
})

export const userRelations = relations(users, ({many})=>({
  quizzes: many(users),
  roles: many(users),

}))

   
export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccount["type"]>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
   
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
   
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

export const quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
    userId: text("user_id").references(()=>users.id),

})

export const questions = pgTable("questions", {
    id: serial("id").primaryKey(),
    quizzId: integer("quizz_id"),
    questionText: text("question_text"),
})

export const quizzRelations = relations(quizzes, ({many, one})=>({
    questions: many(questions),
    submissions: many(quizzSubmissions)
   
}));

export const questionAnswers = pgTable("answers", {
    id: serial("id").primaryKey(),
    questionId: integer("question_id"),
    answerText: text("answer_text"),
    isCorrect: boolean("is_correct"),
})

export const questionsRelations = relations(questions, ({one, many})=>({
    quizz: one(quizzes, {
        fields: [questions.quizzId],
        references: [quizzes.id]
    }),
    answers: many(questionAnswers)
   
}));

export const questionAnswersRelations = relations(questionAnswers, ({one})=>({
  question: one(questions, {
      fields: [questionAnswers.questionId],
      references: [questions.id]
  })
}));

export const quizzSubmissions = pgTable("quizz_submissions", {
  id: serial("id").primaryKey(),
  quizzId: integer("quizz_id"),
  score: integer("score")
});

export const quizzSubmissionsRelations = relations(quizzSubmissions, ({one, many}) => ({
  quizz: one(quizzes, {
    fields: [quizzSubmissions.quizzId],
    references: [quizzes.id]
  }),
}));