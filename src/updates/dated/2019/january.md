# January 2019

## Monthly updates are now actually monthly

The 10th-day thing got old. It was an artifact of when I actually started this
monthly thing, but the confusion of writing about half of the past month and
half of the current was really odd.

So now updates are published on the last day of the month, at 20 o’clock local.

## Monthly updates may not actually be monthly anymore

Two years ago when I did those every month, I did make an effort to get
something done every month. Last year it was a bit lackluster. This year, I'm
basically throwing in the towel. Updates will happen, but they might not happen
every month. Or maybe they will. Habits are hard to break, and I'm not trying to
break this one, so we'll see how it goes.

## Armstrong

I think I’m ready to start talking about this.

Armstrong is a project that has been brewing for the past year or so.

The concept comes, as often with new projects, out of frustration and want.
Armstrong is a job system. Or a job framework. Maybe a job queue. Task queue.
Orchestrator. Scheduler. It is an evolution of [Gearman], adding features rather
than removing them (there are many extra-minimal job queues out there), and
keeping to the patterns that make Gearman strong in my opinion.

[Gearman]: http://gearman.org/

There is a laundry list of features, but one I want to describe here is the
priority system.

Priorities in Gearman work on the basis of three FIFO queues per worker, where
“worker” means a particular type of task that’s handled by a pool of worker
clients. Those three queues are _high_, _normal_, _low_. Jobs, by default, go
into the _normal_ queue, but you can decide which queue they go to explicitly.
The _normal_ queue is only processed when there are no _high_ jobs, and so on.
Within a queue, jobs are processed in order.

This leads to patterns and rules being established in userspace to ensure good
system behaviour. For example, pushing to the _high_ queue is strictly
controlled, so that it remains empty most of the time, except for when something
urgent comes through. Otherwise it’s all too easy to need an urgent compute and
having its jobs just queue up politely _riiiight_ at the back.

Armstrong's priorities work on the basis of a single giant dynamic queue, not
only for each worker, but for all workers all at once. Priority, at the
interface, is expressed in **time expectation**.

One can say:

 - I don’t care when this job runs, I just want it done sometime.
 - I need this job to run within the hour.
 - These tasks all need to finish within 500 milliseconds.

Armstrong then figures out how to achieve that.

The most obvious option is to re-order the queue based on this timing metric,
but that’s not all it can do.

Firstly, as a bit of background, Armstrong keeps records of what jobs ran when,
where, for how long, etc. This is for audit, debugging, monitoring. It’s also
for making priority and scheduling decisions.

Given a job description, the system can query this record and derive the
expected duration of the job, for example by averaging the last few runs.
Without you having to say so, it knows how long jobs take, and can re-order the
queue based on that. Even better, it knows how long jobs take on different
hosts, so it can schedule more efficiently, again without prompting.

Secondly, on an opt-in basis, Armstrong workers may be interruptible. This may
be achieved through custom logic, or it can be achieved using kernel interfaces,
like `SIGSTOP`, `SIGCONT`, or `SuspendProcess()`.

If an urgent job comes through and whatever is currently running will not finish
in time, Armstrong interrupts the jobs, schedules and runs the urgent jobs, then
un-pauses the jobs.

This combination of granular priority, record querying, and control superpowers
makes efficient compute use easy and eliminates hours of setup and discussions.

And through this one feature, you can already see other aspects of the system.
More later!

Armstrong is still in development, and no parts of it are yet available.
