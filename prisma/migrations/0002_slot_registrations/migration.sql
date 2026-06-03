-- CreateEnum
CREATE TYPE "SquadSlot" AS ENUM ('squad1', 'squad2', 'squad3', 'squad4');

-- CreateTable
CREATE TABLE "slot_registrations" (
    "id"         UUID           NOT NULL DEFAULT gen_random_uuid(),
    "full_name"  VARCHAR(255)   NOT NULL,
    "email"      VARCHAR(255)   NOT NULL,
    "phone"      VARCHAR(20)    NOT NULL,
    "slot"       "SquadSlot"    NOT NULL,
    "comments"   TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "slot_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "slot_registrations_email_key" ON "slot_registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "slot_registrations_phone_key" ON "slot_registrations"("phone");

-- CreateIndex
CREATE INDEX "slot_registrations_slot_idx" ON "slot_registrations"("slot");

-- CreateIndex
CREATE INDEX "slot_registrations_created_at_idx" ON "slot_registrations"("created_at");
