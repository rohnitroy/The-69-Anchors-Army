-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('pending', 'approved', 'rejected', 'waitlisted');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'captured', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('beginner', 'intermediate', 'advanced', 'professional');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- CreateTable
CREATE TABLE "registrations" (
    "id"                  UUID                 NOT NULL DEFAULT gen_random_uuid(),
    "registration_id"     VARCHAR(20)          NOT NULL,
    "full_name"           VARCHAR(255)         NOT NULL,
    "email"               VARCHAR(255)         NOT NULL,
    "phone"               VARCHAR(20)          NOT NULL,
    "city"                VARCHAR(100)         NOT NULL,
    "state"               VARCHAR(100)         NOT NULL,
    "age"                 INTEGER,
    "gender"              "Gender",
    "profession"          VARCHAR(255),
    "social_instagram"    VARCHAR(255),
    "social_youtube"      VARCHAR(255),
    "experience_level"    "ExperienceLevel",
    "why_join"            TEXT                 NOT NULL,
    "expectations"        TEXT,
    "profile_photo_url"   TEXT,
    "status"              "RegistrationStatus" NOT NULL DEFAULT 'pending',
    "created_at"          TIMESTAMPTZ(6)       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"          TIMESTAMPTZ(6)       NOT NULL,
    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id"                   UUID           NOT NULL DEFAULT gen_random_uuid(),
    "registration_id"      UUID           NOT NULL,
    "razorpay_order_id"    VARCHAR(100),
    "razorpay_payment_id"  VARCHAR(100),
    "razorpay_signature"   TEXT,
    "amount"               INTEGER        NOT NULL,
    "currency"             VARCHAR(3)     NOT NULL DEFAULT 'INR',
    "payment_status"       "PaymentStatus" NOT NULL DEFAULT 'pending',
    "payment_date"         TIMESTAMPTZ(6),
    "created_at"           TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id"         UUID           NOT NULL DEFAULT gen_random_uuid(),
    "name"       VARCHAR(255)   NOT NULL,
    "email"      VARCHAR(255)   NOT NULL,
    "phone"      VARCHAR(20),
    "subject"    VARCHAR(255),
    "message"    TEXT           NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "id"                     UUID           NOT NULL DEFAULT gen_random_uuid(),
    "admin_action"           VARCHAR(255)   NOT NULL,
    "target_registration_id" UUID,
    "notes"                  TEXT,
    "created_at"             TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "id"              UUID           NOT NULL DEFAULT gen_random_uuid(),
    "registration_id" UUID           NOT NULL,
    "file_type"       VARCHAR(50)    NOT NULL,
    "file_url"        TEXT           NOT NULL,
    "uploaded_at"     TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

-- Unique Constraints
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_registration_id_key" UNIQUE ("registration_id");
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_email_key" UNIQUE ("email");
ALTER TABLE "payments"      ADD CONSTRAINT "payments_razorpay_order_id_key"   UNIQUE ("razorpay_order_id");
ALTER TABLE "payments"      ADD CONSTRAINT "payments_razorpay_payment_id_key" UNIQUE ("razorpay_payment_id");

-- Indexes
CREATE INDEX "registrations_status_idx"       ON "registrations"("status");
CREATE INDEX "registrations_created_at_idx"   ON "registrations"("created_at");
CREATE INDEX "registrations_email_idx"        ON "registrations"("email");
CREATE INDEX "registrations_phone_idx"        ON "registrations"("phone");
CREATE INDEX "payments_registration_id_idx"   ON "payments"("registration_id");
CREATE INDEX "payments_payment_status_idx"    ON "payments"("payment_status");
CREATE INDEX "payments_razorpay_order_id_idx" ON "payments"("razorpay_order_id");
CREATE INDEX "contact_submissions_email_idx"      ON "contact_submissions"("email");
CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions"("created_at");
CREATE INDEX "admin_logs_target_registration_id_idx" ON "admin_logs"("target_registration_id");
CREATE INDEX "admin_logs_created_at_idx"      ON "admin_logs"("created_at");
CREATE INDEX "uploads_registration_id_idx"    ON "uploads"("registration_id");

-- Foreign Keys
ALTER TABLE "payments"    ADD CONSTRAINT "payments_registration_id_fkey"
    FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "admin_logs"  ADD CONSTRAINT "admin_logs_target_registration_id_fkey"
    FOREIGN KEY ("target_registration_id") REFERENCES "registrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "uploads"     ADD CONSTRAINT "uploads_registration_id_fkey"
    FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Auto-generate registration_id as AAA-XXXX using a PostgreSQL sequence
CREATE SEQUENCE IF NOT EXISTS registration_seq START 1;

CREATE OR REPLACE FUNCTION generate_registration_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.registration_id IS NULL OR NEW.registration_id = '' THEN
    NEW.registration_id := 'AAA-' || LPAD(nextval('registration_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_registration_id
  BEFORE INSERT ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION generate_registration_id();
