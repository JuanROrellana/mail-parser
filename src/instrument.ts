import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://f0430db29d135d4ab6f68bd598171b38@o4509218056306688.ingest.us.sentry.io/4509223695155200',
  integrations: [nodeProfilingIntegration()],

  tracesSampleRate: 1.0,

  profilesSampleRate: 1.0,
});
