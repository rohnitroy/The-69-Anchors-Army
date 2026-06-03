-- Add ip column for per-IP duplicate prevention and rate limiting
ALTER TABLE "slot_registrations" ADD COLUMN "ip" VARCHAR(45);

-- CreateIndex
CREATE INDEX "slot_registrations_ip_idx" ON "slot_registrations"("ip");
