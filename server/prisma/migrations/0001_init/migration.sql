-- Initial schema for multi-tenant support system
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'MICROSOFT', 'GITHUB', 'OKTA');
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'AGENT', 'USER');
CREATE TYPE "InputType" AS ENUM ('VOICE', 'TEXT');
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'PENDING', 'CLOSED');

CREATE TABLE "Org" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orgId" UUID NOT NULL REFERENCES "Org"(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    "displayName" TEXT NOT NULL,
    provider "AuthProvider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "RoleAssignment" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orgId" UUID NOT NULL REFERENCES "Org"(id) ON DELETE CASCADE,
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    role "Role" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Ticket" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orgId" UUID NOT NULL REFERENCES "Org"(id) ON DELETE CASCADE,
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "inputType" "InputType" NOT NULL,
    "rawInput" TEXT NOT NULL,
    "aiSummary" TEXT NOT NULL,
    "proposedDepartment" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,
    status "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "Message" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "ticketId" UUID NOT NULL REFERENCES "Ticket"(id) ON DELETE CASCADE,
    "userId" UUID REFERENCES "User"(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "RoutingFeedback" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "ticketId" UUID NOT NULL REFERENCES "Ticket"(id) ON DELETE CASCADE,
    "reviewerId" UUID REFERENCES "User"(id) ON DELETE SET NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "correctedDepartment" TEXT,
    notes TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "KnowledgeBaseDocument" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orgId" UUID NOT NULL REFERENCES "Org"(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX ON "User"("orgId");
CREATE INDEX ON "RoleAssignment"("orgId");
CREATE INDEX ON "Ticket"("orgId");
CREATE INDEX ON "Ticket"(status);
CREATE INDEX ON "Message"("ticketId");
CREATE INDEX ON "RoutingFeedback"("ticketId");
CREATE INDEX ON "KnowledgeBaseDocument"("orgId");
